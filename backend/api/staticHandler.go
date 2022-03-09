package api

import (
	"net/http"
	"path"
	"webhooks/static"

	"github.com/gin-gonic/gin"
)

func rootHandler(c *gin.Context) {
	c.FileFromFS("files/", http.FS(static.FS))
}

func assetsHandler(c *gin.Context) {
	c.FileFromFS(path.Join("files", c.Request.URL.Path), http.FS(static.FS))
}
