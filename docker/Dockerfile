FROM alpine:3.18

# Setup apache and php
RUN apk --no-cache --update \
    add apache2 \
    curl \
    php81-apache2 \
    php81-common \
    php81-curl \
    php81-gd \
    php81-iconv \
    php81-mbstring \
    php81-mysqli \
    php81-mysqlnd \
    php81-xml \
    php81-simplexml \
    php81-xmlwriter \
    php81-tokenizer \
    php81-cli \
    php81-phar \
    php81-dom  \
    && mkdir /htdocs

EXPOSE 80

ADD docker-entrypoint.sh /
RUN chmod 0755 /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
