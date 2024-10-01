/nexus_back-end
    /src
        /application
            /services                   
                EmailService.ts
            /useCase                    
                AuthUseCase.ts
                ProjectUseCase.ts
                UserUseCase.ts
        /domain
            /entities      
                Otp.ts
                Project.ts
                User.ts             
            /errors
                /ServiceErros
                    EmailErros.ts
                    JWTErros.ts
                AppError.ts
                AuthError.ts
                ImageUploadError.ts
                ProjectError.ts
                RepositoryErrors.ts
            /Interfaces                  
                /Repositroy
                    IOTPRepositroy.ts
                    IPasswordResetTokenRepositroy.ts
                    IProjectRepositroy.ts
                    IUserRepositroy.ts
                IEmailService.ts
                IHashingAdapter.ts
                IImageUploadService.ts
                IJWTService.ts
                IUserController.ts
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
                otpModle.ts
                passwordResetTokenModel.ts
                projectModel.ts
                userModel.ts            
            /middleware
                authMiddleware.ts
                errorHandler.ts
                notFoundHandler.ts
                uploadMiddlerware.ts         
            /repository                 
                MongoOtpRepository.ts
                MongoPasswordRepository.ts
                MongoProjectRepository.ts
                MongoUserRepository.ts
            /service
                CloudinaryService.ts
                EmailTemplateService.ts
                JWTService.ts
                NodemailerEmailService.ts
        /presentation
            /controllers
                AuthController.ts
                ProjectController.ts
                UserController.ts
            /routes
                authRoutes.ts
                projectRoutes.ts
                userRoutes.ts
            /utils
                responseHelper.ts
        index.ts











# Middle ware:
- Application-level middleware can be applied in your Express server configuration file, ExpressServer.ts.
- for Router-level middleware Define middleware in middleware folder, and apply it in routes