FROM cimg/go:1.17-node as build

ENV CGO_ENABLED=0
ENV GOOS=linux

RUN wget -cO- https://github.com/go-task/task/releases/download/v3.11.0/task_linux_amd64.tar.gz | tar -xz
COPY --chown=circleci:circleci . .
RUN ./task build

FROM alpine AS package
EXPOSE 1883 3000
WORKDIR /

COPY --from=build /home/circleci/project/artifacts/skirthooks /
ENV SECRET=""

ENTRYPOINT /skirthooks --secret $SECRET