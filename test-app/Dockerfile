FROM node:21
RUN apt-get update && apt-get install -y curl
WORKDIR /app
COPY . .
EXPOSE 3000
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
