/// <reference types="vite/client" />

interface RouteObject {
  path: string;
  element: React.ReactNode;
  authRequired?: boolean;
  requiredRoles?: string[];
}
interface LoginFormInputs {
  email: string;
  password: string;
}
interface SignUpFormInputs {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

interface ForgotPasswordInputs {
  email: string;
}
interface ResetPasswordInputs {
  password: string;
  confirmPassword: string;
}

interface HowItWorksCardProps {
  icon: string;
  title: string;
  description: string;
}

interface Category {
  id: number;
  categoryId: number;
  name: string;
  description?: string;
  icon?: React.ComponentType;
  createdAt: Date;
  updatedAt: Date;
}

interface Slide {
  image: string;
}

interface Subcategory {
  id: number;
  name: string;
  description?: string;
  categoryId: string;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}

interface Brand {
  id: number;
  categoryId: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Address {
  id: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
}

interface WishlistItem {
  id: number;
  wishlistId: number;
  productId: number;
}
interface CartItem {
  id: number;
  cartId: number;
  product: {
    name: string;
  };
  productId: number;
}

interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  length: number;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}
interface Wishlist {
  id: number;
  userId: number;
  items: WishlistItem[];
  createdAt: Date;
  updatedAt: Date;
}

interface AttendanceData {
  fullName: string;
  remainingDays: number;
  membershipPlan: string;
  attendanceDate: string;
}

interface ApiError {
  data?: {
    message?: string;
  };
  status?: number;
}

interface Role {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
}

interface User {
  id: number;
  companyId?: number;
  roleId: number;
  fullName: string;
  email: string;
  password: string;
  address: Address;
  contactNumber: string;
  role: Role;
  cartItems: {
    length: number;
    productNames: string[];
  };
  wishlistItems: {
    length: number;
    productNames: string[];
  };
}

interface Currency {
  id: number;
  name: string;
  code: string;
  symbol: string;
  exchangeRate: number;
  isDefault: boolean;
}

interface Discount {
  id: number;
  name: string;
  discountPercentage: decimal;
  percentage: number;
  startDate: string;
  endDate: string;
}

interface PaymentMethod {
  id: number;
  name: string;
  description: string;
  image: string;
  paymentCode: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: number;
  name: string;
  description?: string;
  code: string;
  price: number;
  stock: number;
  categoryId: number;
  subcategoryId: number;
  brandId: number;
  discountId?: number;
  currencyId?: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  subcategory: Subcategory;
  brand: Brand;
  reviews?: Review[];
  discount?: Discount;
  currency?: string;
  quantity?: number;
  productImages?: ProductImage[];
  sizes: Size[];
  videoLink: string;
  salesCaption: string;
  images?: string[];
  productId?: number;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface Review {
  rate: number;
  id: string;
  reviewerName: string;
  comment: string;
  rating: number;
  user: User;
  createdAt: string;
  updatedAt?: string;
}

type ViewMode = 'card' | 'list';

interface ProductImage {
  id: string;
  imageUrl: string;
  color: Color;
  createdAt: string;
  updatedAt?: string;
}

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'failed';
type PaymentStatus = 'paid' | 'failed';

interface Order {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  productNames: string[];
  status: OrderStatus;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  payment: Payment;
  paymentMethodId: number;
  user?: User;
  orderItems?: OrderItem[];
  paymentMethod?: PaymentMethod;
  reference: string;
  currency: Currency;
  payment?: Payment;
  invoice?: Invoice;
  createdAt: Date;
  updatedAt: Date;
}

interface Payment {
  id: number;
  transactionId: string;
  user: User;
  orderId: string;
  paymentMethod: PaymentMethod;
  status: 'paid' | 'pending' | 'failed';
  amount: number;
  currency: Currency;
  paymentDate: string;
  notes?: string;
  createdAt: string;
}

interface Color {
  id: number;
  name: string;
  hexCode: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Size {
  id: number;
  name: string;
  description?: string;
  sizeValue: string;
  sizeType: string;
  length: number;
  width: number;
  height: number;
  availableQuantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ColorImagePair {
  colorId: number;
  images: File[];
  croppedImageUrl?: string;
}

interface CartSubmissionData {
  userId?: number;
  productId: number;
  quantity: number;
}

interface WishlistSubmissionData {
  userId?: number;
  productId: number;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

interface CheckoutFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
}

interface FAQ {
  question: string;
  answer: string;
  id: string;
}
