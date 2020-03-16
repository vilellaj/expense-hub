FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["ExpenseHub.Service.API/ExpenseHub.Service.API.csproj", "ExpenseHub.Service.API/"]
RUN dotnet restore "ExpenseHub.Service.API/ExpenseHub.Service.API.csproj"
COPY . .
WORKDIR "/src/ExpenseHub.Service.API"
RUN dotnet build "ExpenseHub.Service.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ExpenseHub.Service.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ExpenseHub.Service.API.dll"]