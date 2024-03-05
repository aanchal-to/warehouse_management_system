using MongoDB.Driver;

using warehouse_management.Repository;
using warehouse_management.Repository.IRepository;
using warehouse_management.Services;
using warehouse_management.Services.IServices;

using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using AspNetCore.Identity.MongoDbCore.Infrastructure;
using warehouse_management.Models;
using Microsoft.AspNetCore.Identity;
using AspNetCore.Identity.MongoDbCore.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using warehouse_management.Middleware;




var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
BsonSerializer.RegisterSerializer(new GuidSerializer(MongoDB.Bson.BsonType.String));
BsonSerializer.RegisterSerializer(new DateTimeSerializer(MongoDB.Bson.BsonType.String));
BsonSerializer.RegisterSerializer(new DateTimeOffsetSerializer(MongoDB.Bson.BsonType.String));


var mongoDbIdentityConfig = new MongoDbIdentityConfiguration
{
    MongoDbSettings = new MongoDbSettings
    {
        ConnectionString = "mongodb://localhost:27017",
        DatabaseName = "warehouse_management_system",
    },
    IdentityOptionsAction = options =>
    {
        options.Password.RequireDigit = false;
        options.Password.RequiredLength = 8;
        options.Password.RequireNonAlphanumeric = true;
        options.Password.RequireLowercase = false;

        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
        options.Lockout.MaxFailedAccessAttempts = 5;

        options.User.RequireUniqueEmail = true;
    }

};



builder.Services.ConfigureMongoDbIdentity<ApplicationUser, ApplicationRole, Guid>(mongoDbIdentityConfig)
    .AddUserManager<UserManager<ApplicationUser>>()
    .AddSignInManager<SignInManager<ApplicationUser>>()
    .AddRoleManager<RoleManager<ApplicationRole>>()
    .AddDefaultTokenProviders();


//builder.Services.AddAuthorization(options =>
//{
//    options.AddPolicy("RequireAdminRole", policy =>
//    {
//        policy.AuthenticationSchemes.Add(JwtBearerDefaults.AuthenticationScheme);
//        policy.RequireRole("admin");
//    });
//});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddAuthorization();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IInventoryRepository, InventoryRepository>();
builder.Services.AddTransient<IInventoryService, InventoryService>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddTransient<IOrderService, OrderService>();
builder.Services.AddScoped<ISupplierVendorRepository, SupplierVendorRepository>();
builder.Services.AddTransient<ISupplierVendorService, SupplierVendorService>();
builder.Services.AddScoped<IPurchaseOrderRepository, PurchaseOrderRepository>();
builder.Services.AddTransient<IPurchaseOrderService, PurchaseOrderService>();
builder.Services.AddScoped<ISupplierVendorRepository, SupplierVendorRepository>();
builder.Services.AddTransient<ISupplierVendorService, SupplierVendorService>();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddTransient<ICustomerService, CustomerService>();
builder.Services.AddScoped<IOrderDetailsRepository, OrderDetailsRepository>();
builder.Services.AddTransient<IOrderDetailsService, OrderDetailsService>();
builder.Services.AddScoped<IUsersRepository,UsersRepository>();
builder.Services.AddTransient<IUsersService, UsersService>();


builder.Services.AddCors((o) =>

{

    o.AddPolicy("corsPolicy", b => b.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseMiddleware<JwtAuthMiddleware>();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors("corsPolicy");


app.MapControllers();

app.Run();
