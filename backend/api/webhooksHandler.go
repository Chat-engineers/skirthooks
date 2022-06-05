package api

import (
	"fmt"

	"github.com/Jeffail/gabs/v2"
	"github.com/gin-gonic/gin"
	"github.com/mochi-co/mqtt/server"
)

func publishMqtt(mqttServer *server.Server) gin.HandlerFunc {
	return func(c *gin.Context) {
		go func() {
			data, _ := c.Value("data").(*gabs.Container)
			data.Delete("secret_key")

			organization := data.Path("license_id").String()
			action := data.Path("action").String()

			fmt.Println(organization, action)

			mqttServer.Publish(organization+"/"+action, data.Bytes(), false)
		}()

		c.Next()
	}
}

func assignBody() gin.HandlerFunc {
	return func(c *gin.Context) {
		data, err := gabs.ParseJSONBuffer(c.Request.Body)

		if err != nil {
			c.String(400, "Could not parse body")
			c.Abort()

			fmt.Println(err.Error())

			return
		}

		c.Set("data", data)

		c.Next()
	}
}

func requireSecretAndLicense(secret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		data, _ := c.Value("data").(*gabs.Container)

		if webhookSecret := data.Path("secret_key").Data(); webhookSecret != secret {
			c.String(400, "Secret is incorrect")
			c.Abort()

			return
		}

		if !data.ExistsP("license_id") {
			c.String(400, "License is unavailable")
			c.Abort()

			return
		}

		if !data.ExistsP("action") {
			c.String(400, "Action is unavailable")
			c.Abort()

			return
		}

		c.Next()
	}
}

func webhooksHandler(c *gin.Context) {
	c.String(200, "ok")
}
