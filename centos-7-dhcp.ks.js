# Kickstart file for Centos 7/RHEL 7

# This kickstart was designed to be used with ansible 
# playbooks in a non interactive manner

# System authorization information
auth --enableshadow --passalgo=sha512
# Use CDROM installation media
cdrom
# Use text mode install
text

# Run the Centos Setup Agent on first boot
firstboot --enable
ignoredisk --only-use=vda

# Keyboard layouts
keyboard --vckeymap=us --xlayouts='us'
# System language
lang en_US.UTF-8

# Network information
network  --bootproto=dhcp --device=eth0 --noipv6
network  --hostname="{{vm_fqdn}}"

# Root password=builder-02
# $python -c 'import crypt; print crypt.crypt("builder-02", "$1$SomeSalt$")'
rootpw --iscrypted $1$SomeSalt$qn52h7pl9.0RgG2xkK/9o1

# Do not configure the X Window System
skipx

# System timezone
timezone America/Caracas --isUtc

# Add ansible user
# password=ansible
# member of wheel group
user --groups=wheel --name=ansible --password=$1$SomeSalt$LRZdP3TwZZZ/q8adbdC0g0 --iscrypted --gecos="Ansible"

# System bootloader configuration
bootloader --append=" crashkernel=auto" --location=mbr --boot-drive=vda

# Particionamiento
autopart --type=lvm

# Partition clearing information
clearpart --all --initlabel --drives=vda

%packages
@core
kexec-tools
%end

%addon com_redhat_kdump --enable --reserve-mb='auto'

%end

%post
#---- Install our SSH key ----
mkdir -m0700 /home/ansible/.ssh/

cat <<EOF >/home/ansible/.ssh/authorized_keys
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3+SyLotIWeWQrBDbHXdw7bLvNhTiOK44TdlkzoRE6iGNO8RenyD3pzLYuHqSsLInOdqLNZgTdtfl4uWVnteTEo5fscNHYPJDYKGskAfbPOvUORsfVDBOsnl5mkBnAsqyjxFaqqUG2GSo2CnpeFYDH3KwyqitH+qc/BdqitGK4g2zaKnaA4Bb5n3zugC0rU/gfeuqdbBtPs4PEGPDxuxDKzbQFRNvp/Gx179h7KuchCkWSalTHAPEXYGis8S4sznWx3Vi/YJeuMNWXKTtlnQgKJiDgml56EdfNEl+8WO51fpzTRWNuMyEc6DNqgNwhs9+NkuWRZUxy4n9qqOnuGCm3 gomix@kvm-1.localdomain
EOF

### set permissions
chmod 0600 /home/ansible/.ssh/authorized_keys
chown -R ansible.ansible /home/ansible

### fix up selinux context
restorecon -R /home/ansible/.ssh/

%end
