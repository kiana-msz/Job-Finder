package persistence

import (
	"gorm.io/gorm"
	"time"
)

type Job struct {
	ID           uint `gorm:"primaryKey;autoIncrement"`
	CompanyID    uint
	Title        string
	Field        string
	Time         string // part-time, full-time, internship
	RemoteStatus string // remote, in-office, both
	Salary       string
	Details      string
	Status       string // open, closed
	CreatedAt    time.Time
}

type JobRepository struct {
	db *gorm.DB
}

func NewJobRepository(db *gorm.DB) *JobRepository {
	return &JobRepository{
		db: db,
	}
}

func (r *JobRepository) GetJobByID(jobID uint) (*Job, error) {
	var job Job
	result := r.db.First(&job, jobID)
	if result.Error != nil {
		return nil, result.Error
	}
	return &job, nil
}

func (r *JobRepository) GetJobsByCompanyID(companyID uint) ([]*Job, error) {
	var jobs []*Job
	result := r.db.Where("company_id = ?", companyID).Find(&jobs)
	if result.Error != nil {
		return nil, result.Error
	}
	return jobs, nil
}

func (r *JobRepository) CreateJob(job *Job) error {
	result := r.db.Create(job)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *JobRepository) UpdateJob(job *Job) error {
	result := r.db.Save(job)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *JobRepository) DeleteJob(job *Job) error {
	result := r.db.Delete(job)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *JobRepository) DeleteJobsByCompanyID(companyID uint) error {
	result := r.db.Where("company_id = ?", companyID).Delete(&Job{})
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *JobRepository) SearchJobs() ([]*Job, error) {
	var jobs []*Job
	result := r.db.Find(&jobs)
	if result.Error != nil {
		return nil, result.Error
	}
	return jobs, nil
}
