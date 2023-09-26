package persistence

import (
	"gorm.io/gorm"
	"time"
)

type Application struct {
	ID        uint `gorm:"primaryKey;autoIncrement"`
	JobID     uint
	UserID    uint
	Status    string // pending, accepted, rejected
	CreatedAt time.Time
}

type ApplicationRepository struct {
	db *gorm.DB
}

func NewApplicationRepository(db *gorm.DB) *ApplicationRepository {
	return &ApplicationRepository{
		db: db,
	}
}

func (r *ApplicationRepository) GetApplicationByID(applicationID uint) (*Application, error) {
	var application Application
	result := r.db.First(&application, applicationID)
	if result.Error != nil {
		return nil, result.Error
	}
	return &application, nil
}

func (r *ApplicationRepository) GetApplicationsByJobID(jobID uint) ([]*Application, error) {
	var applications []*Application
	result := r.db.Where("job_id = ?", jobID).Find(&applications)
	if result.Error != nil {
		return nil, result.Error
	}
	return applications, nil
}

func (r *ApplicationRepository) GetApplicationsByUserID(userID uint) ([]*Application, error) {
	var applications []*Application
	result := r.db.Where("user_id = ?", userID).Find(&applications)
	if result.Error != nil {
		return nil, result.Error
	}
	return applications, nil
}

func (r *ApplicationRepository) CreateApplication(application *Application) error {
	result := r.db.Create(application)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *ApplicationRepository) UpdateApplication(application *Application) error {
	result := r.db.Save(application)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *ApplicationRepository) DeleteApplication(application *Application) error {
	result := r.db.Delete(application)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *ApplicationRepository) DeleteApplicationsByJobID(jobID uint) error {
	result := r.db.Where("job_id = ?", jobID).Delete(&Application{})
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *ApplicationRepository) ExistsApplication(jobId uint, userId uint) bool {
	var application Application
	result := r.db.Where("job_id = ? AND user_id = ?", jobId, userId).First(&application)
	if result.Error != nil {
		return false
	}
	return true
}
