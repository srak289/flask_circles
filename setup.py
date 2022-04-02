from setuptools import setup, find_packages

requires = [
	'flask'
]

setup(
	name='flask_circles',
	version='0.0',
	description='Draggable JS circles',
	author='Spencer Rak'
	author_email='spencer.rak+code@gmail.com',
	keywords='web flask js canvas',
	packages=find_packages(),
	include_package_data=True,
	install_requires=requires
)
