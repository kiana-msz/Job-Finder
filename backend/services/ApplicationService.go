package services

import (
	"JobFinder/backend/persistence"
	"errors"
)

type ApplicationService struct {
	applicationRepository persistence.ApplicationRepository
}

func NewApplicationService(applicationRepository persistence.ApplicationRepository) *ApplicationService {
	return &ApplicationService{
		applicationRepository: applicationRepository,
	}
}

func (s *ApplicationService) CreateApplication(jobID uint, userId uint) error {
	// check if the user has already applied for this job
	if s.applicationRepository.ExistsApplication(jobID, userId) {
		return errors.New("user has already applied for this job")
	}
	application := &persistence.Application{
		JobID:  jobID,
		UserID: userId,
		Status: "pending",
	}
	err := s.applicationRepository.CreateApplication(application)
	if err != nil {
		return err
	}
	return nil
}

func (s *ApplicationService) GetApplicationsByJobID(jobID uint) ([]*persistence.Application, error) {
	applications, err := s.applicationRepository.GetApplicationsByJobID(jobID)
	if err != nil {
		return nil, err
	}
	return applications, nil
}

func (s *ApplicationService) GetApplicationsByUserID(userID uint) ([]*persistence.Application, error) {
	applications, err := s.applicationRepository.GetApplicationsByUserID(userID)
	if err != nil {
		return nil, err
	}
	return applications, nil
}

func (s *ApplicationService) UpdateApplicationStatus(applicationID uint, status string) error {
	application, err := s.applicationRepository.GetApplicationByID(applicationID)
	if err != nil {
		return err
	}
	if application == nil {
		return errors.New("application not found")
	}
	if status != "accepted" && status != "rejected" && status != "pending" {
		return errors.New("invalid status - must be accepted, rejected or pending")
	}
	application.Status = status
	err = s.applicationRepository.UpdateApplication(application)
	if err != nil {
		return err
	}
	return nil
}

func (s *ApplicationService) DeleteApplication(applicationID uint) error {
	application, err := s.applicationRepository.GetApplicationByID(applicationID)
	if err != nil {
		return err
	}
	if application == nil {
		return errors.New("application not found")
	}
	err = s.applicationRepository.DeleteApplication(application)
	if err != nil {
		return err
	}
	return nil
}

func (s *ApplicationService) GetApplicationByID(applicationID uint) (*persistence.Application, error) {
	application, err := s.applicationRepository.GetApplicationByID(applicationID)
	if err != nil {
		return nil, err
	}
	return application, nil
}
