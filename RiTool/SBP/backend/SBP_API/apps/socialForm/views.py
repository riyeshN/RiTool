import os.path
import json
import datetime
from rest_framework import viewsets, status, views
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Form, Comment, User
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, CommentSerializer, FormSerializer, TokenSerializer, FormGetSerializer, \
    CommentGetSerializer
from ..helperClass.sshHelper import ssh_run, ssh_addfile, ssh_getfile, ssh_removedirectory
from rest_framework.decorators import action
from ...settings import SEND_FORM_FILES
from friendship.models import Friend, Follow, Block, FriendshipRequest


# Create your views here.
class FormGetViewSet(viewsets.ModelViewSet):
    queryset = Form.objects.all()
    serializer_class = FormGetSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        all_friends = list(map(lambda value: value.id, Friend.objects.friends(request.user)))
        all_friends.append(request.user.id)
        querySet = Form.objects.filter(user__in=all_friends)
        queryset = self.filter_queryset(querySet)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class FormViewSet(viewsets.ModelViewSet):
    queryset = Form.objects.all()
    serializer_class = FormSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.file_url:
            filepath = os.path.join(SEND_FORM_FILES, f"{request.auth.user_id}", instance.title.replace(" ", "_"))
            ssh_removedirectory(filepath)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def create(self, request, *args, **kwargs):
        # remember old state
        _mutable = request.data._mutable
        # set to mutable
        request.data._mutable = True
        request.data['user'] = self.request.user.id
        files = request.FILES.getlist('files')
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Iterate through the files and insert them into the unixbox
        json_file = {}
        for file in files:
            filepath = os.path.join(SEND_FORM_FILES, f"{request.auth.user_id}", request.data['title'].replace(" ", "_"),
                                    file.name)
            filetoinsert = file.file
            json_file[file.name] = ssh_addfile(filetoinsert, filepath)
        # add JSON to string
        json_input = json.dumps(json_file)
        request.data['file_url'] = json_input
        # set mutable flag back
        request.data._mutable = _mutable
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(user=self.request.user)
        return query_set

    @action(detail=False, methods=['POST'])
    def get_file(self, request):
        if 'filepath' in request.data and 'filename' in request.data:
            response = {'message': 'its working'}
            print(request.data['filepath'])
            ssh_getfile(request.data['filepath'], request.data['filename'])
            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'message': 'missing file path'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        request.data['user'] = self.request.user.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CommentGetViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentGetSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (AllowAny,)


class TokenViewSet(viewsets.ModelViewSet):
    serializer_class = TokenSerializer
    queryset = Token.objects.all()
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(user=self.request.user)
        return query_set


class FriendShipViewSet(viewsets.ViewSet):
    queryset = Friend.objects.all()
    permission_classes = (IsAuthenticated,)

    @action(detail=False, methods=['POST'])
    def send_request(self, request):
        if 'other_user' in request.data and 'message' in request.data:
            print(request.data)
            try:
                other_user = User.objects.get(username=request.data['other_user'])
                Friend.objects.add_friend(
                    request.user,  # The sender
                    other_user,  # The recipient
                    message=request.data['message'])  # This message is optional
                response = {'message': 'request sent'}
                return Response(response, status=status.HTTP_202_ACCEPTED)
            except Exception as e:
                response = {'message': e.args}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        else:
            response = {'message': 'missing message and/or request party'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['POST'])
    def accept_request(self, request):
        if 'to_user' in request.data and 'response' in request.data:
            try:
                # friend_reques = FriendshipRequest.objects.get(to_user=1)
                friend_request = FriendshipRequest.objects.get(from_user=request.data['to_user'], to_user=request.user)
                if request.data['response']:
                    friend_request.accept()
                    response = {'message': 'request accepted'}
                else:
                    friend_request.reject()
                    response = {'message': 'request rejected'}
                return Response(response, status=status.HTTP_202_ACCEPTED)
            except Exception as e:
                response = {'message': e.args}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        else:
            response = {'message': 'missing to_user and/or reponse type'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['DELETE'])
    def delete_friend(self, request):
        if 'other_user' in request.data:
            try:
                Friend.objects.remove_friend(request.user, request.data['other_user'])
                response = {'message': 'friend deleted'}
                return Response(response, status=status.HTTP_410_GONE)
            except Exception as e:
                response = {'message': e.args}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        else:
            response = {'message': 'missing to_user'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['GET'])
    def get_friends(self, request):
        try:
            all_friends = Friend.objects.friends(request.user)
            friendsList = list(map(lambda val: {"id": val.pk, "user": val.username}, all_friends))
            json_l = json.dumps(friendsList)
            response = json.loads(json_l)
            return Response(response, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            response = {'message': e.args}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['GET'])
    def get_pending_requests(self, request):
        try:
            all_pending_friends = Friend.objects.unrejected_requests(user=request.user)
            pending_friends_list = list(map(lambda val: {"id": val.from_user.id, "user": val.from_user.username,
                                                         "message": val.message,
                                                         "created": f"{datetime.datetime(val.created.year, val.created.month, val.created.day, val.created.hour, val.created.minute, val.created.second)}"},
                                            all_pending_friends))
            json_l = json.dumps(pending_friends_list)
            response = json.loads(json_l)
            return Response(response, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            response = {'message': e.args}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['GET'])
    def get_sent_requests(self, request):
        try:
            all_pending_friends = Friend.objects.sent_requests(user=request.user)
            pending_friends_list = list(map(lambda val: {"id": val.to_user.id, "user": val.to_user.username,
                                                         "created": f"{datetime.datetime(val.created.year, val.created.month, val.created.day, val.created.hour, val.created.minute, val.created.second)}"},
                                            all_pending_friends))
            json_l = json.dumps(pending_friends_list)
            response = json.loads(json_l)
            return Response(response, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            response = {'message': e.args}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
