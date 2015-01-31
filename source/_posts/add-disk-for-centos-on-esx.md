title: 为ESX上的CentOS添加新硬盘
tags:
  - Linux
id: 1552
categories:
  - 建站相关
date: 2012-09-29 12:47:29
---

一台运行在ESX上的CentOS服务器磁盘不够，现需要为其增加硬盘空间。计划新增加一个虚拟硬盘，并使用LVM进行卷管理，挂载到/store。

### 1、在ESX中增加一块新硬盘

在ESX中找到该虚拟机，在“Edit Setting”中，为其添加一块新硬盘，并记住其“Virtual Device Node”，如“SCSI(0:1)”。<!--more-->

[![Add Disk to VM on ESX](/upfile/2012/09/add_disk_in_ESX.png "Add Disk to VM on ESX")](/upfile/2012/09/add_disk_in_ESX.png)

### 2、在CentOS中发现新硬盘

使用如下的命令，可以在虚拟机中发现这块新增加的硬盘：
> echo "scsi add-single-device 0 0 1 0" &gt; /proc/scsi/scsi
之后，可以通过fdisk -l看到新增加的硬盘，类似如下：
> Disk /dev/sda: 7516 MB, 7516192768 bytes
> 
> 255 heads, 63 sectors/track, 913 cylinders
> 
> Units = cylinders of 16065 * 512 = 8225280 bytes
> 
> 
> Device Boot Start End Blocks Id System
> 
> /dev/sda1 * 1 13 104391 83 Linux
> 
> /dev/sda2 14 913 7229250 5 Extended
> 
> /dev/sda5 14 770 6080571 83 Linux
> 
> /dev/sda6 771 913 1148616 82 Linux swap / Solaris
> 
> 
> Disk /dev/sdb: 21.4 GB, 21474836480 bytes
> 
> 255 heads, 63 sectors/track, 2610 cylinders
> 
> Units = cylinders of 16065 * 512 = 8225280 bytes
> 
> 
> Disk /dev/sdb doesn't contain a valid partition table

### 3、使用LVM管理新硬盘

这台机器之前并不是使用LVM进行磁盘管理，为了方便，对这个新增加的硬盘采用LVM进行卷管理。先创建一个PV：
> pvcreate /dev/sdb
再建立VG：
> vgcreate vg0 /dev/sdb
创建LV：
> lvcreate -L  19GB -n data vg0

### 4、格式化与挂载

将这个新增加的卷格式化：
> mkfs.ext3  /dev/vg0/data
再创建挂载点：
> mkdir /store
挂载：
> mount /dev/vg0/data /store
设置开机后自动挂载：
> /dev/vg0/data           /store                  ext3    defaults        0 0
现在就可以通过df -lh查看到新的分区信息了。

PS：许久不wordpress，连想个登陆地址都想了半天，真正动笔后，发现写起来也没有那么艰难，不过这篇大概只能叫记。