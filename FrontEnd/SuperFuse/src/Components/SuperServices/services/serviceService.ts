import type { Service } from "../interfaces/Service";
import type { ServiceCategory } from "../interfaces/ServiceCategory";
import { mockServices, mockCategories } from "../data/mockData";

export const serviceService = {
  // Fetch all services
  getAllServices: async (): Promise<Service[]> => {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockServices), 300);
    });
  },

  // Fetch single service by ID
  getServiceById: async (serviceId: string): Promise<Service | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const service = mockServices.find((s) => s.id === serviceId);
        resolve(service || null);
      }, 200);
    });
  },

  // Get all service categories
  getCategories: async (): Promise<ServiceCategory[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCategories), 200);
    });
  },

  // Get services by category
  getServicesByCategory: async (categoryId: string): Promise<Service[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const services = mockServices.filter((s) => s.categoryId === categoryId);
        resolve(services);
      }, 250);
    });
  },

  // Search services by name
  searchServices: async (query: string): Promise<Service[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = mockServices.filter((s) =>
          s.name.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
      }, 200);
    });
  },

  // Get popular services (sorted by rating)
  getPopularServices: async (limit: number = 5): Promise<Service[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const popular = [...mockServices]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, limit);
        resolve(popular);
      }, 200);
    });
  },
};
