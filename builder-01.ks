#version=RHEL7
# System authorization information
auth --enableshadow --passalgo=sha512

# Use CDROM installation media
cdrom

# Use text mode install
text

firstboot --disable
eula --agreed
ignoredisk --only-use=vda

# Keyboard layouts
keyboard --vckeymap=us --xlayouts='us'

# System language
lang es_VE.UTF-8

# Network information
network  --bootproto=dhcp --device=eth0 --noipv6 
network  --hostname=zimbra-1.entipi.com

# Root password
# zimbra49516371
# $python -c 'import crypt; print crypt.crypt("builder49516371", "$1$SomeSalt$")'
rootpw --iscrypted $1$SomeSalt$pvxygHd3cC84ebATT9DDA.
# ansible49516371
user --name=ansible --gecos=ansible_user --groups=wheel --password=$1$SomeSalt$qmQRE7z3l7oWsqoNwD2wv/ --iscrypted

# Do not configure the X Window System
skipx

# System timezone
timezone America/Caracas --isUtc

# System bootloader configuration
bootloader --append=" crashkernel=auto" --location=mbr --boot-drive=vda
autopart --type=lvm

# Partition clearing information
clearpart --all --initlabel --drives=vda

%packages
@base
@core
kexec-tools

%end

%addon com_redhat_kdump --enable --reserve-mb='auto'

%end

reboot
