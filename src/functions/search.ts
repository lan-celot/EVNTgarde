/**
 * Search function that filters arrays based on a search query
 * @param items 
 * @param query 
 * @param getSearchableText 
 * @returns 
 */
export function searchItems<T>(items: T[], query: string, getSearchableText: (item: T) => string): T[] {
    if (!query || query.trim() === "") {
      return items
    }
  
    const normalizedQuery = query.toLowerCase().trim()
  
    return items.filter((item) => {
      const searchableText = getSearchableText(item).toLowerCase()
      return searchableText.includes(normalizedQuery)
    })
  }
  
  /**
   * Search function specifically for the homepage specialties
   * @param specialties 
   * @param query 
   * @returns 
   */
  export function searchSpecialties(specialties: string[], query: string): string[] {
    return searchItems(specialties, query, (specialty) => specialty)
  }
  
  /**
   * Filter items by category/specialty
   * @param items 
   * @param categories 
   * @param getCategoryFn 
   * @returns 
   */
  export function filterByCategory<T>(items: T[], categories: string[], getCategoryFn: (item: T) => string): T[] {
    if (!categories || categories.length === 0) {
      return items
    }
  
    return items.filter((item) => {
      const category = getCategoryFn(item)
      return categories.includes(category)
    })
  }
  
  /**
   * Simple function to search and filter homepage items
   * @param items 
   * @param query 
   * @param categories 
   * @returns 
   */
  export function searchAndFilterItems<T extends { name: string; specialty: string }>(
    items: T[],
    query: string,
    categories?: string[],
  ): T[] {

    let results = searchItems(items, query, (item) => `${item.name} ${item.specialty}`)
  

    if (categories && categories.length > 0) {
      results = filterByCategory(results, categories, (item) => item.specialty)
    }
  
    return results
  }
  
  