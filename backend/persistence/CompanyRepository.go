package persistence

import (
	"gorm.io/gorm"
	"time"
)

type Company struct {
	ID        uint `gorm:"primaryKey;autoIncrement"`
	Name      string
	Email     string `gorm:"uniqueIndex"`
	Password  string
	Field     string
	Founded   string
	Employees int
	Location  string
	Details   string
	Img          string
	CreatedAt time.Time
}

type CompanyRepository struct {
	db *gorm.DB
}

func NewCompanyRepository(db *gorm.DB) *CompanyRepository {
	return &CompanyRepository{
		db: db,
	}
}

func (r *CompanyRepository) GetCompanyByID(companyID uint) (*Company, error) {
	var company Company
	result := r.db.First(&company, companyID)
	if result.Error != nil {
		return nil, result.Error
	}
	return &company, nil
}

func (r *CompanyRepository) GetCompanyByEmail(email string) (*Company, error) {
	var company Company
	result := r.db.Where("email = ?", email).First(&company)
	if result.Error != nil {
		return nil, result.Error
	}
	return &company, nil
}

func (r *CompanyRepository) CreateCompany(company *Company) error {
	result := r.db.Create(company)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *CompanyRepository) UpdateCompany(company *Company) error {
	result := r.db.Save(company)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *CompanyRepository) DeleteCompany(company *Company) error {
	result := r.db.Delete(company)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *CompanyRepository) ExistsCompanyByEmail(email string) bool {
	var count int64
	r.db.Model(&Company{}).Where("email = ?", email).Count(&count)
	return count > 0
}
