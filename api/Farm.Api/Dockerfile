# Use the .NET Core SDK to build the project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copy and build the project
COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o out

# Use the .NET Core runtime to run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .

EXPOSE 8080

ENTRYPOINT ["dotnet", "Farm.Api.dll"]
