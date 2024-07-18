﻿using FullStackTest.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FullStackTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PolicyController : ControllerBase
    {
        private readonly IPolicyRepository _policyRepository;

        public PolicyController(IPolicyRepository policyRepository)
        {
            _policyRepository = policyRepository;
        }


        //TODO add methods to get/create/update/delete data from _repository
        [HttpGet]
        public IEnumerable<Policy> Get()
        {
            return _policyRepository.Get();
        }
    }
}
