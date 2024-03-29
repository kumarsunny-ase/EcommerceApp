using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using EcommerceAPI.Models;

namespace EcommerceAPI.Repositories.Implementation.Interface
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllAsync( string sort, int? brandId, int? typeId, string searchString);
        Task<Product> GetByIdAsync(int id);
        Task<IReadOnlyList<ProductBrand>>GetAllProductBrandsAsync();
        Task<IReadOnlyList<ProductType>>GetAllProductTypesAsync();
    }
}