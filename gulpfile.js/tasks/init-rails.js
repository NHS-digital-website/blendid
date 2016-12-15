var gulp = require('gulp')
var gutil = require('gulp-util')

gulp.task('init-rails', function() {
  var stream = gulp.src(['extras/rails/**/*', '*!README.md'])
    .pipe(gulp.dest(process.cwd()))

  gutil.log(gutil.colors.green('Created app/helpers/gulp_asset_helper.rb'))
  gutil.log(gutil.colors.green('Created config/initializers/gulp.rb'))
  gutil.log(gutil.colors.green('Created config/deploy.rb.example'))
  gutil.log(
gutil.colors.yellow(`

Using Capistrano? Add the following to deploy.rb so assets will compile on deploy:
`), gutil.colors.magenta(`
namespace :deploy do
  namespace :npm do
    task :install, :roles => :app do
      # Install NPM dependencies in development mode because the build command
      # gets invoked on the server
      run "cd #{release_path} && npm install && npm run production"
    end
  end
end

# Run NPM install after assets:precompile
before "deploy:assets:precompile", "deploy:npm:install"

`), gutil.colors.yellow(`
Make sure to add 'public/assets' to your .gitignore file.
`))

  return stream
})
