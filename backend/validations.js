import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
  body('fullName', 'Укажите имя').isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
  body('company', 'Укажите компанию').isLength({ min: 2 }),
  body('phone', 'Укажите верный телефон').isLength({min: 11}),
  body('jobTitle', 'Укажите должность').isLength({min: 2})
];

export const postCreateValidation = [
  body('title', 'Введите имя участника').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст').isLength({ min: 3 }).isString(),
  body('tags', 'Неверный формат таланта').optional().isString(),
  body('imageUrl', 'Неверная ссылка на видео').optional().isString(),
  body('imgUrl', 'Неверная ссылка на изображение').optional().isString(),
  body('age', 'Введите возраст').isLength({min: 1}).isString(),
];
