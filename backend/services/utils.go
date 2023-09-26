package services

import (
	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

func GenerateJWTToken(id uint, role string) (string, error) {
	// Create the token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":   id,
		"role": role,
	})

	// Sign the token with the secret
	tokenString, err := token.SignedString([]byte("secret"))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func VerifyJWTToken(tokenString string) (uint, string, error) {
	// Parse the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})
	if err != nil {
		return 0, "", err
	}
	return uint(token.Claims.(jwt.MapClaims)["id"].(float64)), token.Claims.(jwt.MapClaims)["role"].(string), nil
}

func hashPassword(password string) (string, error) {
	hashedPassword := []byte(password)
	hashedPassword, err := bcrypt.GenerateFromPassword(hashedPassword, bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

func checkPasswordHash(password string, password2 string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(password2), []byte(password))
	return err == nil
}
