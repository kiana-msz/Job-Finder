package services

import (
	"JobFinder/backend/persistence"
	"errors"
	"time"
)

type CompanyService struct {
	companyRepository persistence.CompanyRepository
}

func NewCompanyService(companyRepository persistence.CompanyRepository) *CompanyService {
	return &CompanyService{
		companyRepository: companyRepository,
	}
}

func (s *CompanyService) GetCompanyByID(companyID uint) (*persistence.Company, error) {
	company, err := s.companyRepository.GetCompanyByID(companyID)
	if err != nil {
		return nil, err
	}
	return company, nil
}

func (s *CompanyService) GetCompanyByEmail(email string) (*persistence.Company, error) {
	company, err := s.companyRepository.GetCompanyByEmail(email)
	if err != nil {
		return nil, err
	}
	return company, nil
}

func (s *CompanyService) RegisterCompany(company *persistence.Company) error {
	// Check if the email is already registered
	existingCompany, _ := s.companyRepository.GetCompanyByEmail(company.Email)
	if existingCompany != nil {
		return errors.New("email is already registered")
	}

	// Hash the company's password
	hashedPassword, err := hashPassword(company.Password)
	if err != nil {
		return err
	}

	// Set the hashed password and other necessary fields
	company.Password = hashedPassword
	company.CreatedAt = time.Now()

	// Save the company to the database
	err = s.companyRepository.CreateCompany(company)
	if err != nil {
		return err
	}

	return nil
}

func (s *CompanyService) Login(email, password string) (string, error) {
	// Get the company by email
	//TODO please check this I might have made a joob. Parmida
	company, err := s.companyRepository.GetCompanyByEmail(email)
	if company == nil {
		return "", errors.New("account is not registered")
	}
	if err != nil {
		return "", err
	}
	if company == nil {
		return "", errors.New("company not found")
	}

	// Verify the company's password
	passwordMatch := checkPasswordHash(password, company.Password)
	if !passwordMatch {
		return "", errors.New("incorrect password")
	}

	return GenerateJWTToken(company.ID, "company")
}

func (s *CompanyService) EditProfile(
	companyId uint,
	name string,
	field string,
	founded string,
	location string,
	employees int,
	img string,
	details string,
) error {
	company, err := s.companyRepository.GetCompanyByID(companyId)
	if company == nil || err != nil {
		return errors.New("company not found")
	}
	if name != "" {
		company.Name = name
	}
	if field != "" {
		company.Field = field
	}
	if founded != "" {
		company.Founded = founded
	}
	if location != "" {
		company.Location = location
	}
	if employees != 0 {
		company.Employees = employees
	}
	if img != "" {
		company.Img = img
	}
	if details != "" {
		company.Details = details
	}
	err = s.companyRepository.UpdateCompany(company)
	if err != nil {
		return err
	}
	return nil
}

func (s *CompanyService) ExistsByEmail(email string) bool {
	return s.companyRepository.ExistsCompanyByEmail(email)
}
