package presentation

import (
	"JobFinder/backend/services"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
)

func AuthMiddleware(c *gin.Context) {
	// check if token should be provided based on the route
	nonAuthUrls := []string{
		"/register/user",
		"/login",
		"/register/company",
		"/jobs",
		"/company",

		// todo other paths should be added here if needed
	}
	for _, url := range nonAuthUrls {
		if url == c.Request.URL.Path {
			c.Next()
			return
		}
	}

	token := c.Request.Header.Get("Authorization")
	fmt.Println("token recieved:", token)
	if token == "" {
		c.JSON(401, gin.H{"error": "token not provided"})
		c.Abort()
		return
	}
	// verify token
	id, role, err := services.VerifyJWTToken(token)
	if err != nil {
		c.JSON(401, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.Set("id", id)
	c.Set("role", role)
	c.Next()
}

func LogMiddleware(c *gin.Context) {
	// log the request received
	request := c.Request
	log.Println("Request received: ", request.Method, request.URL.Path, request.URL.RawQuery, request.Body)
	c.Next()
}
