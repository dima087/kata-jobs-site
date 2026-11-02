export interface Job {
    id: string;
    title: string;
    salary: number;
    experience: string;
    workFormat: 'remote' | 'office' | 'hybrid';
    company: string;
    city: string;
    skills: string[];
}

export interface JobsResponse {
    jobs: Job[];
    total: number;
    page: number;
    limit: number;
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