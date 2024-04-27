### nginx 配置
在此给出一个简单的nginx配置文件，以vue项目为例。

```nginx
# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

# user root;
worker_processes auto;
# error_log /var/log/nginx/error.log;
# pid /run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    # log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                   '$status $body_bytes_sent "$http_referer" '
    #                   '"$http_user_agent" "$http_x_forwarded_for"';

    # access_log  /var/log/nginx/access.log  main;

    keepalive_timeout   900;
    # sendfile            on;
    # tcp_nopush          on;
    # tcp_nodelay         on;
    # types_hash_max_size 4096;

    # include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # gzip  on;
    # gzip_comp_level  2;
    # gzip_min_length  1024;
    # gzip_types   text/plain application/javascript  application/x-javascript text/css application/xml text/javascript  image/jpeg image/gif image/png;

    server {
    	listen 9000;
    	# server_name baidu.com;
        server_name  localhost;
        index index.html;
        # 没有指定base
        root D:\项目地址\dist;
        location / {
            # add_header Cache-Control "public, max-age=31536000, immutable";
            try_files $uri /index.html; 
        } 
        # 指定base
        root D:\项目地址;
        location /base {
            # add_header Cache-Control "public, max-age=31536000, immutable";
            try_files $uri /index.html; 
        } 
        # 接口代理           
        #   location /api/ {
        #       proxy_set_header Host $host;
        #       proxy_set_header  X-Real-IP        $remote_addr;
        #       proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
        #       proxy_set_header X-NginX-Proxy true;
        # 末尾有/则请求url不拼接/api/
        #       proxy_pass http://localhost:8081/;
        #    }
        #    location /ws/ {
        #        proxy_pass http://localhost:8810;
        #        proxy_set_header Host $host;
        #        proxy_http_version 1.1;
        #        proxy_set_header Upgrade $http_upgrade;
        #        proxy_set_header Connection "upgrade";
        #        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        #        proxy_set_header X-Real-IP $remote_addr;
        #    }
        # return 301 https://$server_name$request_uri;
        }
}
```