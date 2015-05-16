# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "ubuntu/trusty64"

  config.vm.provision :shell, path: "bootstrap.sh"
  config.vm.provision :shell, path: "vagrant.sh", privileged: false

  config.vm.network :forwarded_port, host: 4567, guest: 80

  config.vm.network "private_network", ip: "192.168.50.4"

  config.vm.synced_folder "public/", "/var/www/russian-lesson.com/public_html", create: true, group: "www-data", owner: "www-data"
end
