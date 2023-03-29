#! /bin/bash

containers=$(sudo docker ps -q)
sudo docker kill $containers
