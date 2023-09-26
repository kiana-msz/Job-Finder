package presentation

import (
	"JobFinder/backend/persistence"
	"JobFinder/backend/services"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"net/http"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT,DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
func InitServices() {
	// initialize router
	router := initRouter()
	router.Use(CORSMiddleware())
	router.Use(LogMiddleware)
	router.Use(AuthMiddleware)

	// initialize db, repositories and the services
	db := initDB()
	userRepository := persistence.NewUserRepository(db)
	userService := services.NewUserService(*userRepository)

	companyRepository := persistence.NewCompanyRepository(db)
	companyService := services.NewCompanyService(*companyRepository)

	jobRepository := persistence.NewJobRepository(db)
	jobService := services.NewJobService(*jobRepository)

	applicationRepository := persistence.NewApplicationRepository(db)
	applicationService := services.NewApplicationService(*applicationRepository)

	handler := NewHandler(userService, companyService, jobService, applicationService)
	handler.RegisterRoutes(router)

	// initialize server
	log.Println("Starting server on port 8080...")
	err := http.ListenAndServe(":8080", router)
	if err != nil {
		log.Fatal(err)
	}
}

func initRouter() *gin.Engine {
	router := gin.Default()
	return router
}

func initDB() *gorm.DB {
	dsn := "host=localhost user=postgres password=12345 dbname=JobFinder port=5432 sslmode=disable"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}
	err = db.AutoMigrate(&persistence.User{}, &persistence.Company{}, &persistence.Job{}, &persistence.Application{})
	if err != nil {
		log.Fatal(err)
	}

	return db
}
