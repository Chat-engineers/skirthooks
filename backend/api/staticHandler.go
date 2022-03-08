package api

import (
	"embed"
	"net/http"
	"path"

	"github.com/gin-gonic/gin"
)

//go:embed frontend_dist/*
var assetsFS embed.FS

func rootHandler(c *gin.Context) {
	c.FileFromFS("frontend_dist/", http.FS(assetsFS))
}

func assetsHandler(c *gin.Context) {
	c.FileFromFS(path.Join("frontend_dist", c.Request.URL.Path), http.FS(assetsFS))
}
