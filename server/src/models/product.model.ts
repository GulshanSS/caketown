import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategory",
    },
    innerCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "innerCategory",
    },
    message: {
      onCake: {
        type: Boolean,
        default: true,
      },
      onCard: {
        type: Boolean,
        default: true,
      },
    },
    productMake: [
      {
        name: {
          type: String,
        },
        price: {
          type: Number,
          default: 0,
        },
      },
    ],
    flavours: [
      {
        name: {
          type: String,
        },
        price: {
          type: Number,
          default: 0,
        },
      },
    ],
    sizesAvailable: [
      {
        size: Number,
        price: {
          actual: Number,
          selling: Number,
        },
      },
    ],
    photoCake: {
      type: Boolean,
      default: false,
    },
    assets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "asset",
      },
    ],
    bestSeller: {
      type: Boolean,
      default: false,
    },
    deliveryOptions: {
      pincodes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "pincode",
        },
      ],
    },
    note: {
      type: String,
    },
    description: {
      type: String,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      },
    ],
    rating: {
      type: Number,
      default: 5,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("product", ProductSchema);

export default ProductModel;
