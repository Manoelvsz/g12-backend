import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(): Promise<{
        status: string;
        message: string;
        data: any;
        count: any;
    }>;
    findOne(id: string): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
    create(createPostDto: CreatePostDto): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
    remove(id: string): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
}
