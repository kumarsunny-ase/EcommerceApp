using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EcommerceAPI.Data;
using EcommerceAPI.Models;
using EcommerceAPI.Repositories.Implementation.Interface;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAPI.Repositories.Implementation
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _storeContext;
        public ProductRepository(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        public async Task<List<Product>> GetAllAsync()
        {
            return await _storeContext.Products.ToListAsync();
        }

        public async Task<Product> GetById(int id)
        {
            return await _storeContext.Products.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}