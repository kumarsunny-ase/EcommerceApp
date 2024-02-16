using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
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

        public async Task<List<Product>> GetAllAsync( string sort, int? brandId, int? typeId, string searchString)
        {
            IQueryable<Product> query = _storeContext.Products
            .Include(p => p.ProductBrand)
            .Include(p => p.ProductType);

            if (!string.IsNullOrEmpty(sort))
            {
                switch(sort)
                {
                    case "priceAsc":
                        query = query.OrderBy(p => (double)p.Price);
                        break;
                    case "priceDesc":
                        query = query.OrderByDescending(p => (double)p.Price);
                        break;
                    default:
                        query = query.OrderBy(n => n.Name);
                        break;
                }
            }

            if (!string.IsNullOrEmpty(searchString))
            {
                string searchLower = searchString.ToLower();
                query = query.Where(p => p.Name.ToLower().Contains(searchLower));
            }

            query = query.Where(x=> (!brandId.HasValue || x.ProductBrandId == brandId) && 
                (!typeId.HasValue || x.ProductTypeId == typeId));

            return await query.ToListAsync();           
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            return await _storeContext.Products
            .Include(p => p.ProductType)
            .Include(p => p.ProductBrand)
            .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IReadOnlyList<ProductBrand>> GetAllProductBrandsAsync()
        {
            return await _storeContext.ProductBrands.ToListAsync();
        }

        public async Task<IReadOnlyList<ProductType>> GetAllProductTypesAsync()
        {
            return await _storeContext.ProductTypes.ToListAsync();
        }
       
    }
}