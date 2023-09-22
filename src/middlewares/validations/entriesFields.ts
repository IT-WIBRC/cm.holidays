import { checkSchema } from "express-validator";

const emailValidation = checkSchema({
  email: {
    exists: {
      errorMessage: "Email is required"
    },
    isEmail: {
      bail: true,
      errorMessage: "Email is in wrong format",
      options: {
        allow_ip_domain: false,
        allow_utf8_local_part: true,
        require_tld: true,
        ignore_max_length: true
      }
    }
  }
});

const passwordValidation = checkSchema({
  password: {
    exists: {
      errorMessage: "Password is required"
    },
    trim: true,
    isLength: {
      errorMessage: "Password must have at least 6 character and less than 11",
      options: {
        min: 6,
        max: 10
      }
    },
    matches: {
      errorMessage:
        "Password must have at least one uppercase, lowercase, digit and special character",
      options: new RegExp(
        "(^[\\w.-@]{8,10})",
        "g"
      )
    }
  }
});

const firstnameValidation = checkSchema({
  firstname: {
    exists: {
      errorMessage: "FirstName is required"
    },
    trim: true,
    isLength: {
      errorMessage: "FirstName must have length less than 2",
      options: { min: 2 }
    }
  }
});

const lastnameValidation = checkSchema({
  lastName: {
    exists: {
      errorMessage: "LastName is required"
    },
    trim: true,
    isLength: {
      errorMessage: "LastName must have length less than 2",
      options: { min: 2 }
    }
  }
});

const assertRequiredLoginFieldsAreNotEmpty = checkSchema({
  email: {
    exists: {
      errorMessage: "Email is required"
    },
    trim: true
  },
  password: {
    exists: {
      errorMessage: "Password is required"
    },
    trim: true
  }
});

const nameSchema = {
  name: {
    notEmpty: {
      options: {
        ignore_whitespace: true
      },
      errorMessage: "Name field is empty"
    },
    exists: {
      errorMessage: "Name is required"
    },
    trim: true,
    isLength: {
      errorMessage: "Name must have length more than 2",
      options: { min: 2 }
    }
  }
};

const nameValidation = checkSchema(nameSchema);

const descriptionValidation = checkSchema({
  description: {
    exists: {
      errorMessage: "Description is required"
    },
    notEmpty: {
      options: {
        ignore_whitespace: false
      },
      errorMessage: "Description field is empty"
    },
    trim: true,
    isLength: {
      errorMessage: "Description must have length more than 10",
      options: { min: 10 }
    }
  }
});

const assertPostCreation = checkSchema({
  ...nameSchema,
  service: {
    notEmpty: {
      options: {
        ignore_whitespace: false
      },
      errorMessage: "Service field is empty"
    },
    exists: {
      errorMessage: "Malformed request (service doesn't exist for this post)"
    }
  },
  "service.id": {
    exists: {
      errorMessage: "The id field is empty"
    },
    isUUID: {
      errorMessage: "Wrong id is not an uuid"
    }
  }
});

const rolesValidation = checkSchema({
  roles: {
    notEmpty: {
      errorMessage: "Roles are required",
      options: {
        ignore_whitespace: true
      }
    },
    isArray: {
      options: {
        min: 1
      },
      errorMessage: "Roles must be and array"
    }
  }
});

const postsValidation = checkSchema({
  posts: {
    notEmpty: {
      errorMessage: "Posts are required",
      options: {
        ignore_whitespace: true
      }
    },
    isArray: {
      options: {
        min: 1
      },
      errorMessage: "Post must be and array"
    }
  }
});

export {
  passwordValidation,
  emailValidation,
  firstnameValidation,
  lastnameValidation,
  nameValidation,
  descriptionValidation,
  rolesValidation,
  postsValidation
};

export { assertRequiredLoginFieldsAreNotEmpty, assertPostCreation };