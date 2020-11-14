#!/bin/bash

awslocal s3 mb s3://fp-dev-cdn
awslocal s3api put-bucket-acl --bucket fp-dev-cdn --acl public-read
