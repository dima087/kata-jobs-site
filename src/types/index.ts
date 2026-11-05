export interface Job {
    id: number;
    name: string;
    company_name: string;
    city: string;
    salary: string;
    experience?: string;
    workFormat?: string;
    work_format?: string;
    skills?: string[];
    description?: string;
    about_company?: string;
}

export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
}

export interface JobsResponse {
    jobs: Job[];
    pagination: Pagination;
    success: boolean;
}

export interface JobsState {
    jobs: Job[];
    total: number;
    page: number;
    loading: boolean;
    error: string | null;
    search: string;
    city: string;
    skills: string[];
}