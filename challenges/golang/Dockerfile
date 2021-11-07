FROM golang:1.17 as builder

WORKDIR /go/src/app

COPY hello.go .

RUN go mod init example/hello
RUN go get -d -v

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build ./hello.go

FROM scratch

WORKDIR /app

COPY --from=builder /go/src/app/hello .

ENTRYPOINT ["./hello"]