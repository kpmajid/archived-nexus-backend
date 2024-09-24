/nexus_back-end
    /src
        /application
            /services                   
                EmailService.ts
            /useCase                    
                AuthUseCase.ts
        /domain
            /entities                   
            /errors
                /ServiceErros
                    EmailErros.ts
                    JWTErros.ts
                AppError.ts
                AuthError.ts
                RepositoryErrors.ts
            /Interfaces                  
            /models
                ApiResponse.ts
        /infrastrucutre
            /adapter                    
                BcryptHashingAdapter.ts
            /config
                database.ts             
                ExpressServer.ts        
                routes.ts               
            /database
                userModel.ts            
                otpModle.ts
            /middleware
                errorHandler.ts         
                authMiddleware.ts
            /repository                 
                MonogUserRepository.ts
                MongoOtpRepository.ts
            /service
                CloudinaryService.ts
                JWTService.ts
                NodemailerEmailService.ts
        /presentation
            /controllers
                AuthController.ts
                UserController.ts
            /routes
                authRoutes.ts
                userRoutes.ts
            /utils
                responseHelper.ts
        index.ts











# Middle ware:
- Application-level middleware can be applied in your Express server configuration file, ExpressServer.ts.
- for Router-level middleware Define middleware in middleware folder, and apply it in routes