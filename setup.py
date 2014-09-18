#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2014 Sébastien Diemer <sebastien.diemer@mines-paristech.fr>

"""
Setup
"""
try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

config = {
    'description': 'A photo application',
    'author': u'Sébastien Diemer',
    'url': 'https://github.com/sebdiem/photo-pi',
    'download_url': 'https://github.com/sebdiem/photo-pi',
    'author_email': 'diemersebastien@yahoo.fr',
    'version': '0.1',
    'install_requires': [''],
    'packages': ['photo-pi'],
    'scripts': [],
    'name': 'photo-pi'
}

setup(**config)
