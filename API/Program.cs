//Creating a web application host
using API.Data;
using Microsoft.EntityFrameworkCore;
using API.ExceptionsBreakpoint;

var builder = WebApplication.CreateBuilder(args); 

// Add services to the container.


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//Added DbServer to the container
builder.Services.AddDbContext<SaveContext>(opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

//added CORS configuration to the API
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<BreakpointExp>();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//for enabling CORS header send back to clientapp
//AllowCredentials to allow client to pass cookie backward and forward
app.UseCors(opt => 
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});
app.UseAuthorization();

app.MapControllers();

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<SaveContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

/*checking if database exists, if doesnt would create it 
/and apply pending migrations*/
try {
    context.Database.Migrate();
    DbInitializer.Initialize(context);
}
catch(Exception ex)
{
    logger.LogError(ex, "Migration failed due to an unexpected databbase initialization!");
}

app.Run();
