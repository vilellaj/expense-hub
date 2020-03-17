using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpenseHub.Service.Domain.Commands;
using ExpenseHub.Service.Domain.Handlers;
using ExpenseHub.Service.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseHub.Service.API.Controllers.v1
{
    [Route("api/v1/expenses")]
    public class ExpenseController : Controller
    {
        private readonly ExpenseHandler _handler;
        private readonly IExpenseRepository _expenseRepository;

        public ExpenseController(ExpenseHandler handler,
            IExpenseRepository expenseRepository)
        {
            _handler = handler;
            _expenseRepository = expenseRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _expenseRepository.GetAll();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromQuery] int id)
        {
            var result = await _expenseRepository.GetById(id);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> GetById([FromBody] AddExpenseCommand command)
        {
            var result = await _handler.Handle(command);

            if (!_handler.Valid)
            {
                return BadRequest(_handler.Notifications);
            }

            return Ok(result);
        }
    }
}
