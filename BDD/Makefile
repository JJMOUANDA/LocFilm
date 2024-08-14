OS := $(shell uname -s)

ifneq (,$(filter $(OS),Linux Darwin))
include Makefile.linux
else
include Makefile.win
endif
