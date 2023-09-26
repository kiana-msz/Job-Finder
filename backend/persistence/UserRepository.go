package persistence

import (
	"errors"
	"fmt"
	"gorm.io/gorm"
	"time"
)

// User represents a user account
type User struct {
	ID         uint   `gorm:"primaryKey;autoIncrement"`
	Email      string `gorm:"uniqueIndex"`
	Firstname  string
	Lastname   string
	Profession string
	Degree     string
	Location   string
	Language   string
	Details    string
	Password   string
	Img          string
	CreatedAt  time.Time
}

// UserRepository handles user-related data operations
type UserRepository struct {
	db *gorm.DB
}

// NewUserRepository creates a new instance of UserRepository
func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{
		db: db,
	}
}

// CreateUser creates a new user account
func (r *UserRepository) CreateUser(user *User) error {
	result := r.db.Create(user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// GetUserByID retrieves a user by ID
func (r *UserRepository) GetUserByID(userID uint) (*User, error) {
	var user User
	result := r.db.First(&user, userID)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, result.Error
	}
	return &user, nil
}

// GetUserByEmail retrieves a user by email
func (r *UserRepository) GetUserByEmail(email string) (*User, error) {
	var user User
	result := r.db.Where("email = ?", email).First(&user)
	if result.Error != nil {
		fmt.Println(result)
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, result.Error
	}
	return &user, nil
}

// DeleteUser deletes a user account
func (r *UserRepository) DeleteUser(userID uint) error {
	result := r.db.Delete(&User{}, userID)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// UpdateUserPassword updates the password for a user account
func (r *UserRepository) UpdateUserPassword(userID uint, hashedPassword string) error {
	result := r.db.Model(&User{}).Where("id = ?", userID).Update("password", hashedPassword)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *UserRepository) EditProfile(
	id uint,
	firstname,
	lastname,
	profession,
	degree,
	location,
	language,
	img,
	details string,
) error {
	// Get the user by ID
	user, err := r.GetUserByID(id)
	if err != nil {
		return err
	}
	if user == nil {
		return errors.New("user not found")
	}
	// Update the user's profile in the database based on the non-empty fields
	if firstname != "" {
		user.Firstname = firstname
	}
	if lastname != "" {
		user.Lastname = lastname
	}
	if profession != "" {
		user.Profession = profession
	}
	if degree != "" {
		user.Degree = degree
	}
	if location != "" {
		user.Location = location
	}
	if language != "" {
		user.Language = language
	}
	if img != "" {
    		user.Img = img
    	}
	if details != "" {
		user.Details = details
	}
	result := r.db.Save(&user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *UserRepository) ExistsByEmail(email string) bool {
	var count int64
	r.db.Model(&User{}).Where("email = ?", email).Count(&count)
	return count > 0
}
