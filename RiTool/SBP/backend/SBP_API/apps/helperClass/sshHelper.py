import time

from paramiko import SSHClient, AutoAddPolicy, Transport
import os
from pathlib import Path


def ssh_run():
    ip = '198.74.57.243'
    username = 'root'
    password = '4442130rN$'
    command = 'ls'
    ssh = SSHClient()
    ssh.set_missing_host_key_policy(AutoAddPolicy())
    ssh.connect(hostname=ip, username=username, password=password, look_for_keys=False, allow_agent=False)
    stdin, stdout, stderr = ssh.exec_command(command)
    lines = stdout.readlines()
    print(lines)
    ssh.close()


def ssh_removedirectory(path):
    ip = '198.74.57.243'
    username = 'root'
    password = '4442130rN$'
    command = f"rm -rf {path}"
    ssh = SSHClient()
    ssh.set_missing_host_key_policy(AutoAddPolicy())
    ssh.connect(hostname=ip, username=username, password=password, look_for_keys=False, allow_agent=False)
    stdin, stdout, stderr = ssh.exec_command(command)
    while not stdout.channel.exit_status_ready():
        time.sleep(5)
    lines = stdout.readlines()
    print(lines)
    ssh.close()


def ssh_addfile(file, path):
    ip = '198.74.57.243'
    username = 'root'
    password = '4442130rN$'
    filepath = ""
    ssh = SSHClient()
    ssh.set_missing_host_key_policy(AutoAddPolicy())
    ssh.connect(hostname=ip, username=username, password=password, look_for_keys=False, allow_agent=False)
    ftp_client = ssh.open_sftp()
    # we will check for each directory and create it if it does not exist
    directory = os.path.dirname(path)
    folders = []
    while 1:
        directory, folder = os.path.split(directory)

        if folder != "" and folder != ".":
            folders.append(folder)
        else:
            break
    folders.reverse()
    # for eachpath in patharray:

    for folder in folders:
        if ftp_client.getcwd():
            directory = os.path.join(ftp_client.getcwd(), folder)
        else:
            directory = os.path.join('/', folder)
        try:
            ftp_client.chdir(directory)  # Test if remote_path exists
        except IOError:
            ftp_client.mkdir(directory)  # Create remote_path
            ftp_client.chdir(directory)
    try:
        ftp_client.putfo(file, path)  # At this point, you are in remote_path in either case
        filepath = path
    except Exception as e:
        filepath = f"Error: {e}"
    ftp_client.close()
    ssh.close()
    return filepath


def ssh_getfile(path, filename):
    ip = '198.74.57.243'
    username = 'root'
    password = '4442130rN$'
    ssh = SSHClient()
    ssh.set_missing_host_key_policy(AutoAddPolicy())
    ssh.connect(hostname=ip, username=username, password=password, look_for_keys=False, allow_agent=False)
    ftp_client = ssh.open_sftp()
    home = str(Path.home())
    ftp_client.get(path, os.path.join(home, "Downloads", filename))
    ftp_client.close()
    ssh.close()
