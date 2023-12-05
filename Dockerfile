FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["WebApiEntityFrameworkDockerSqlServer.csproj", "."]
RUN dotnet restore "./WebApiEntityFrameworkDockerSqlServer.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "WebApiEntityFrameworkDockerSqlServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WebApiEntityFrameworkDockerSqlServer.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Añade la configuración para Redis
RUN apt-get update && apt-get install -y redis-tools
ENTRYPOINT ["dotnet", "WebApiEntityFrameworkDockerSqlServer.dll"]
