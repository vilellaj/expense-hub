using System.Threading.Tasks;
using ExpenseHub.Service.Domain.Commands;
using ExpenseHub.Service.Domain.Commands.Results;
using ExpenseHub.Service.Domain.Handlers;
using ExpenseHub.Service.Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _expenseRepository.GetAll();
            return Ok(result);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _expenseRepository.GetById(id);
            return Ok(result);
        }


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] AddExpenseCommand command)
        {
            var result = await _handler.Handle(command);

            if (!_handler.Valid)
            {
                return BadRequest(_handler.Notifications);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateExpenseCommand command)
        {
            var result = await _handler.Handle(command);

            if (!_handler.Valid)
            {
                return BadRequest(_handler.Notifications);
            }

            return Ok(result);
        }


        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var expense = await _expenseRepository.GetById(id);
            await _expenseRepository.Delete(expense);
            return Ok(new MessageResult("Item deleted"));
        }
    }
}
