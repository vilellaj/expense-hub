FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1.200-buster AS build
WORKDIR /src
COPY ["ExpenseHub.Service.API/ExpenseHub.Service.API.csproj", "ExpenseHub.Service.API/"]
COPY ["ExpenseHub.Service.Domain/ExpenseHub.Service.Domain.csproj", "ExpenseHub.Service.Domain/"]
COPY ["ExpenseHub.Service.Infra/ExpenseHub.Service.Infra.csproj", "ExpenseHub.Service.Infra/"]
COPY ["ExpenseHub.Service.Shared/ExpenseHub.Service.Shared.csproj", "ExpenseHub.Service.Shared/"]
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


