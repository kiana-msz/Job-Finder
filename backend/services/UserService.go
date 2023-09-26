package services

import (
	"JobFinder/backend/persistence"
	"errors"
	"fmt"
	"time"
)

// UserService handles user-related operations
type UserService struct {
	userRepository persistence.UserRepository
}

// NewUserService creates a new instance of UserService
func NewUserService(userRepository persistence.UserRepository) *UserService {
	return &UserService{
		userRepository: userRepository,
	}
}

// RegisterAccount registers a new user account
func (s *UserService) RegisterAccount(user *persistence.User) error {
	// Check if the email is already registered
	existingUser, _ := s.userRepository.GetUserByEmail(user.Email)
	if existingUser != nil {
		return errors.New("email is already registered")
	}

	// Hash the user's password
	hashedPassword, err := hashPassword(user.Password)
	if err != nil {
		return err
	}

	// Set the hashed password and other necessary fields
	user.Password = hashedPassword
	user.CreatedAt = time.Now()

	// Save the user to the database
	err = s.userRepository.CreateUser(user)
	if err != nil {
		return err
	}

	return nil
}

// Login performs user login and returns a JWT token
func (s *UserService) Login(email, password string) (string, error) {
	// Get the user by email
	//TODO please check this I might have made a joob. Parmida
	user, err := s.userRepository.GetUserByEmail(email)
	if user == nil {
		return "", errors.New("account is not registered")
	}
	if err != nil {
		return "", err
	}
	if user == nil {
		return "", errors.New("user not found")
	}
	fmt.Println("user:", user)

	// Verify the user's password
	passwordMatch := checkPasswordHash(password, user.Password)
	if !passwordMatch {
		return "", errors.New("incorrect password")
	}

	// Generate and return a JWT token
	token, err := GenerateJWTToken(user.ID, "user")
	if err != nil {
		return "", err
	}

	return token, nil
}

// DeleteAccount deletes a user account
func (s *UserService) DeleteAccount(userID uint) error {
	// Delete the user from the database
	err := s.userRepository.DeleteUser(userID)
	if err != nil {
		return err
	}

	return nil
}

// ChangePassword changes the password for a user account
func (s *UserService) ChangePassword(email, currentPassword, newPassword string) error {
	// Get the user by ID
	user, err := s.userRepository.GetUserByEmail(email)
	if err != nil {
		return err
	}
	if user == nil {
		return errors.New("user not found")
	}

	// Verify the user's current password
	passwordMatch := checkPasswordHash(currentPassword, user.Password)
	if !passwordMatch {
		return errors.New("incorrect current password")
	}

	// Hash the new password
	hashedPassword, err := hashPassword(newPassword)
	if err != nil {
		return err
	}

	// Update the user's password in the database
	err = s.userRepository.UpdateUserPassword(user.ID, hashedPassword)
	if err != nil {
		return err
	}

	return nil
}

func (s *UserService) EditProfile(userId uint, firstname, lastname, profession, degree, location, language, img, details string) error {
	err := s.userRepository.EditProfile(userId, firstname, lastname, profession, degree, location, language, img, details)
	if err != nil {
		return err
	}
	return nil
}

func (s *UserService) ExistsByEmail(email string) bool {
	return s.userRepository.ExistsByEmail(email)
}

func (s *UserService) GetUserByID(userID uint) (*persistence.User, error) {
	user, err := s.userRepository.GetUserByID(userID)
	if err != nil {
		return nil, err
	}
	return user, nil
}
