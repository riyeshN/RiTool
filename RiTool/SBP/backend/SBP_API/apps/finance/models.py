from django.db import models
from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Bills(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=150, blank=False, null=False)
    owner = models.CharField(max_length=150, blank=False, null=False)
    price = models.DecimalField(max_length=10, decimal_places=2, blank=False, null=False)
    category = models.CharField(max_length=150, black=False, null=False)
    end_date = models.DateField()
    start_date = models.DateTimeField(blank=False, null=False)

    class Meta:
        unique_together = (('user', 'name'),)
        index_together = (('user', 'name'),)


class Purchases(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=150, blank=False, null=False)
    owner = models.CharField(max_length=150, blank=False, null=False)
    price = models.DecimalField(max_length=10, decimal_places=2, blank=False, null=False)
    category = models.CharField(max_length=150, black=False, null=False)
    purchase_date = models.DateTimeField(blank=False, null=False)